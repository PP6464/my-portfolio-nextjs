'use client';

import PageContainer from '@/app/components/page-container/page-container';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getDb } from '@/lib/firebase/client';
import Section from '@/app/components/section/section';

type Skill = {
	name: string;
	text: string;
	image: string;
	link: string;
}

export default function Skills() {
	const [skills, setSkills] = useState<Skill[]>([]);

	useEffect(() => {
		return onSnapshot(
			collection(getDb(), 'skills'),
			(snap) => {
				setSkills(snap.docs.map((d) => d.data() as Skill));
			},
			(err) => {
				alert('Failed to load data');
				console.error('Failed to load skills:', err);
			},
		);
	}, []);

	return (
		<PageContainer>
			<h1>Skills</h1>
			{ skills.map((skill, i) => (
				<Section key={ skill.name } title={ skill.name } body={ skill.text } href={ skill.link } image={ skill.image }
								 linkText={ 'Learn more' } reverse={ i % 2 == 0 }/>
			)) }
		</PageContainer>
	);
}
