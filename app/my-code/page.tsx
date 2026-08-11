'use client';

import PageContainer from '@/app/components/page-container/page-container';
import { useEffect, useState } from 'react';
import { collection, DocumentReference, onSnapshot } from 'firebase/firestore';
import { getDb } from '@/lib/firebase/client';
import './my-code.css';
import Link from 'next/link';
import { ArrowOutward } from '@mui/icons-material';

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
				console.error('Failed to load tag data: ', err);
			},
		);
	}, [docRef]);

	return (
		<div  style={ {
			backgroundColor: tag.colour,
			border: `2px solid ${ tag.border }`,
			color: tag.border,
			borderRadius: '50px',
			width: 'fit-content',
			padding: '5px 10px',
		} }>
			<p>{ tag.name }</p>
		</div>
	)
}

export default function MyCode() {
	const [codes, setCodes] = useState<Code[]>([]);

	useEffect(() => {
		return onSnapshot(
			collection(getDb(), 'my-code'),
			(snap) => {
				setCodes(snap.docs.map((d) => d.data() as Code));
			},
			(err) => {
				console.error('Failed to load exploring areas: ', err);
			},
		);
	}, []);

	return (
		<PageContainer>
			<h1>My Code</h1>
			{ codes.map((code) => (
				<div key={ code.name } className={ 'code' }>
					<h2>{ code.name }{ code.in_progress ? ' [In Progress]' : '' }</h2>
					<div>
						{ code.tags.map((tag) => (
							<TagView key={ `${ code.name }-${ tag.id }` } docRef={tag} />
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
		</PageContainer>
	);
}
