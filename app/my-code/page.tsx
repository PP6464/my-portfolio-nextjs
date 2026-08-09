'use client';

import PageContainer from '@/app/components/page-container/page-container';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDb } from '@/lib/firebase/client';
import './my-code.css';
import Link from 'next/link';
import { ArrowOutward } from '@mui/icons-material';

type Framework = {
	name: string;
	colour: string;
	border: string;
}

type Code = {
	link: string;
	name: string;
	frameworks: Framework[];
	deploy_link?: string;
	in_progress: boolean;
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
				console.error('Failed to load exploring areas:', err);
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
						{ code.frameworks.map((framework) => (
							<div key={ `${ code.name }-${ framework.name }` } style={ {
								backgroundColor: framework.colour,
								border: `2px solid ${ framework.border }`,
								color: framework.border,
								borderRadius: '50px',
								width: 'fit-content',
								padding: '5px 10px',
							} }>
								<p>{ framework.name }</p>
							</div>
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
