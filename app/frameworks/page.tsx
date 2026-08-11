'use client';

import PageContainer from '@/app/components/page-container/page-container';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { getDb } from '@/lib/firebase/client';
import FrameworksView from '@/app/frameworks/frameworks-view';

type Section = {
	name: string;
	entries: number;
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
						entries: d.data().entries,
						id: d.id,
					};
				}));
			},
			(err) => {
				console.error('Failed to load framework sections:', err);
			},
		);
	}, []);

	function totals() {
		const newTotals = [0];

		for (let i = 0; i < sections.length; i++) {
			newTotals.push(sections[i].entries + newTotals[i]);
		}

		return newTotals;
	}

	return (
		<PageContainer>
			<h1>Frameworks</h1>
			{ sections.map((section, i) => (
				<div key={ section.id } className={ 'flex flex-col items-center w-full' }>
					<h2 id={ section.id } className={ 'underline p-2' }>{ section.name }:</h2>
					<FrameworksView id={ section.id } base={ totals()[i] }/>
				</div>
			)) }
		</PageContainer>
	);
}
