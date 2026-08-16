'use client';

import PageContainer from '@/app/components/page-container/page-container';
import { useEffect, useState } from 'react';
import { collection, DocumentReference, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDb } from '@/lib/firebase/client';
import './my-code.css';
import Link from 'next/link';
import { ArrowOutward } from '@mui/icons-material';
import { useTheme } from 'next-themes';
import { useMounted } from '@/app/hooks/use-mounted';

type Tag = {
	name: string;
	colour: string;
	border: string;
}

type Code = {
	link: string;
	name: string;
	tags: DocumentReference[];
	deploy_link?: string;
	in_progress: boolean;
}

function TagView({ docRef }: { docRef: DocumentReference }) {
	const { resolvedTheme } = useTheme();
	const mounted = useMounted();

	const [tag, setTag] = useState<Tag>({
		name: '',
		colour: 'var(--background)',
		border: 'var(--background)',
	});

	useEffect(() => {
		return onSnapshot(
			docRef,
			(snap) => {
				setTag(snap.data() as Tag);
			},
			(err) => {
				alert('Failed to load data');
				console.error('Failed to load tag data: ', err);
			},
		);
	}, [docRef]);

	if (!mounted) return null;

	return tag.name === '' ? <p>Loading tag info ...</p> : (
		<div style={ {
			backgroundColor: resolvedTheme === 'light' ? tag.border : tag.colour,
			border: `2px solid ${ resolvedTheme === 'light' ? tag.colour : tag.border }`,
			color: resolvedTheme === 'light' ? tag.colour : tag.border,
			borderRadius: '50px',
			width: 'fit-content',
			padding: '3px 6px',
		} }>
			<p style={ { fontSize: '13px' } }>{ tag.name }</p>
		</div>
	);
}

export default function MyCode() {
	const [codes, setCodes] = useState<Code[]>([]);

	useEffect(() => {
		return onSnapshot(
			query(
				collection(getDb(), 'my-code'),
				orderBy('in_progress', 'desc'),
				orderBy('finishedOn', 'desc'),
			),
			(snap) => {
				setCodes(snap.docs.map((d) => d.data() as Code));
			},
			(err) => {
				alert('Failed to load data');
				console.error('Failed to load code entries: ', err);
			},
		);
	}, []);

	return (
		<PageContainer>
			<h1>My Code</h1>
			{ codes.length === 0 ? <p>Loading ...</p> : <></> }
			{ codes.map((code) => (
				<div key={ code.name } className={ 'code' }>
					<h2>{ code.name }{ code.in_progress ? ' [In Progress]' : '' }</h2>
					<div>
						{ code.tags.map((tag) => (
							<TagView key={ `${ code.name }-${ tag.id }` } docRef={ tag }/>
						)) }
					</div>
					<Link target={ '_blank' } rel={ 'noreferrer' } href={ code.link }>
						<p>View code on GitHub</p>
						<ArrowOutward/>
					</Link>
					{ code.deploy_link ?
						<Link target={ '_blank' } rel={ 'noreferrer' } href={ code.deploy_link }><p>View online</p>
							<ArrowOutward/></Link> : <></> }
				</div>
			)) }
			<div style={ { padding: '5px' } }></div>
		</PageContainer>
	);
}
