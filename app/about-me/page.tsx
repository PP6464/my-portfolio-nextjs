'use client';

import PageContainer from '@/app/components/page-container/page-container';
import { GitHub, LinkedIn, Phone } from '@mui/icons-material';
import Email from '@mui/icons-material/Email';
import Link from 'next/link';
import './about-me.css';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { getDb } from '@/lib/firebase/client';

type Achievement = {
	name: string;
	desc: string;
}

export default function AboutMe() {
	const contactDetails = {
		linkedIn: { url: 'https://www.linkedin.com/in/panth-patel-b92309214', value: 'Panth Patel', icon: <LinkedIn/> },
		github: { url: 'https://github.com/PP6464', value: 'PP6464', icon: <GitHub/> },
		email: { url: 'mailto:32ppatel@gmail.com', value: '32ppatel@gmail.com', icon: <Email/> },
		phone: { url: 'tel:+44-73058-21678', value: '+44 73058 21678', icon: <Phone/> },
	};
	const [achievements, setAchievements] = useState<Achievement[]>([]);

	useEffect(() => {
		onSnapshot(
			collection(getDb(), 'achievements'),
			(snap) => {
				setAchievements(snap.docs.map((d) => d.data() as Achievement));
			},
			(err) => {
				alert('Failed to load data');
				console.error('Failed to load achievements: ', err);
			},
		);
	}, []);

	return (
		<PageContainer>
			<h1>About Me</h1>
			<p className={ 'info-text' } style={ { width: 'min(75vw, 600px)' } }>I am a programmer with experience using many
				different frameworks and with many
				different areas of programming, spanning web and app development to API and neural network development. I am
				always learning and exploring new frameworks and areas of programming.</p>
			<div style={ { padding: '10px' } }></div>
			<h1>Achievements/Prizes</h1>
			<ul>
				{ achievements.map(achievement => (
					<li key={ achievement.name } className={ 'achievement' }>
						<h3>{ achievement.name }</h3>
						<p className={ 'info-text' }>{ achievement.desc }</p>
					</li>
				)) }
				{ achievements.length === 0 ? <p>Loading achievements...</p> : <></> }
			</ul>
			<div style={ { padding: '10px' } }></div>

			<h1>Contact Details</h1>
			<ul>
				<div key={ 'linkedIn' } className={ 'contact-detail' }>
					<Link href={ contactDetails.linkedIn.url } target={ '_blank' } rel={ 'noreferrer' }>
						{ contactDetails.linkedIn.icon }
						<p>{ contactDetails.linkedIn.value }</p>
					</Link>
				</div>
				<div key={ 'github' } className={ 'contact-detail' }>
					<Link href={ contactDetails.github.url } target={ '_blank' } rel={ 'noreferrer' }>
						{ contactDetails.github.icon }
						<p>{ contactDetails.github.value }</p>
					</Link>
				</div>
				<div key={ 'email' } className={ 'contact-detail' }>
					<Link href={ contactDetails.email.url } target={ '_blank' } rel={ 'noreferrer' }>
						{ contactDetails.email.icon }
						<p>{ contactDetails.email.value }</p>
					</Link>
				</div>
				<div key={ 'phone' } className={ 'contact-detail' }>
					<Link href={ contactDetails.phone.url } target={ '_blank' } rel={ 'noreferrer' }>
						{ contactDetails.phone.icon }
						<p>{ contactDetails.phone.value }</p>
					</Link>
				</div>
			</ul>

		</PageContainer>
	);
}
