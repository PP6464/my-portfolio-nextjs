import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { getDb } from '@/lib/firebase/client';
import Section from '@/app/components/section/section';

type Framework = {
	name: string;
	text: string;
	image: string;
}

export default function FrameworksView({ id, base }: { id: string, base: number }) {
	const [frameworks, setFrameworks] = useState<Framework[]>([]);

	useEffect(() => {
		return onSnapshot(
			collection(getDb(), `frameworks/${ id }/sections`),
			(snap) => {
				setFrameworks(snap.docs.map((d) => d.data() as Framework));
			},
			(err) => {
				alert('Failed to load data');
				console.error('Failed to load frameworks:', err);
			},
		);
	}, [id]);

	return (
		<>
			{ frameworks.length === 0 ? <p>Loading framework information ...</p> : <></> }
			{ frameworks.map((framework, i) => (
				<Section key={ framework.name } title={ framework.name } body={ framework.text } href={ '/my-code' }
								 image={ framework.image } linkText={ 'View Code' } reverse={ (i + base) % 2 == 0 }/>
			)) }
		</>
	);
}