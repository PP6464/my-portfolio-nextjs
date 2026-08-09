'use client';

import PageContainer from '@/app/components/page-container/page-container';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDb } from '@/lib/firebase/client';
import FrameworksView from '@/app/frameworks/frameworks-view';

type Section = {
	name: string;
	id: string;
}

export default function Frameworks() {
	const [sections, setSections] = useState<Section[]>([]);

	useEffect(() => {
		return onSnapshot(
			collection(getDb(), 'frameworks'),
			(snap) => {
				setSections(snap.docs.map((d) => {
					return {
						name: d.data().name,
						id: d.id,
					};
				}));
			},
			(err) => {
				console.error('Failed to load framework sections:', err);
			},
		);
	}, []);

	return (
		<PageContainer>
			<h1>Frameworks</h1>
			{ sections.map((section) => (
				<div key={ section.id } className={ 'flex flex-col items-center w-full' }>
					<h2 id={ section.id } className={ 'underline p-2' }>{ section.name }:</h2>
					<FrameworksView id={ section.id }/>
				</div>
			)) }
		</PageContainer>
	);
}
