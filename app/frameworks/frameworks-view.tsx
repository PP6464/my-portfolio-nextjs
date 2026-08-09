import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDb } from '@/lib/firebase/client';
import Section from '@/app/components/section/section';

type Framework = {
	name: string;
	text: string;
	image: string;
}

export default function FrameworksView({ id }: { id: string }) {
	const [frameworks, setFrameworks] = useState<Framework[]>([]);

	useEffect(() => {
		return onSnapshot(
			query(collection(getDb(), `frameworks/${ id }/sections`), orderBy('index')),
			(snap) => {
				setFrameworks(snap.docs.map((d) => d.data() as Framework));
			},
			(err) => {
				console.error('Failed to load frameworks:', err);
			},
		);
	}, [id]);

	return (
		<div className={ 'w-full' }>
			{ frameworks.map((framework) => (
				<Section key={ framework.name } title={ framework.name } body={ framework.text } href={ '/my-code' }
								 image={ framework.image } linkText={ 'View Code' }/>
			)) }
		</div>
	);
}