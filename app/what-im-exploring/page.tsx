'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDb } from '@/lib/firebase/client';
import Section from '@/app/components/section/section';
import PageContainer from '@/app/components/page-container/page-container';

type Exploring = {
	name: string;
	text: string;
	image: string;
}

export default function WhatImExploring() {
	const [exploring, setExploring] = useState<Exploring[]>([]);

	useEffect(() => {
		return onSnapshot(
			collection(getDb(), 'what-im-exploring'),
			(snap) => {
				setExploring(snap.docs.map((d) => d.data() as Exploring));
			},
			(err) => {
				console.error('Failed to load exploring areas:', err);
			},
		);
	}, []);

	return (
		<PageContainer>
			<h1 className={ 'pb-1' }>What I&apos;m Exploring</h1>
			{ exploring.map((area) => (
				<Section key={ area.name } title={ area.name } body={ area.text } href={ '/my-code' } image={ area.image }
								 linkText={ 'View experimental code' }/>
			)) }
		</PageContainer>
	);
}
