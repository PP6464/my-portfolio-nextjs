'use client';

import Link from 'next/link';
import './section.css';
import { useEffect, useRef } from 'react';
import { ArrowOutward } from '@mui/icons-material';

export default function Section({ title, body, href, image, linkText, reverse }: {
	title: string, body: string, href: string, image: string, linkText: string, reverse: boolean
}) {
	const selfRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver((entries, _) => {
			entries.map((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				} else {
					entry.target.classList.remove('visible');
				}
			});
		});

		if (selfRef.current) {
			observer.observe(selfRef.current);
		}

		return () => {
			if (selfRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(selfRef.current);
			}
		};
	}, []);

	return (
		<div className={ `section visible ${reverse ? 'reverse' : ''}` } ref={ selfRef }>
			<div>
				<div>
					<h1>{ title }</h1>
					<p>{ body }</p>
				</div>
				<Link href={ href }>
					<p>{linkText}</p>
					<ArrowOutward />
				</Link>
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */ }
			<img src={ image } alt={ title }/>
		</div>
	);
}