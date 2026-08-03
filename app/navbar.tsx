'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Email from '@mui/icons-material/Email';
import { Phone, Sunny } from '@mui/icons-material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './navbar.css';

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/about-me', label: 'About Me' },
	{ href: '/skills', label: 'Skills' },
	{ href: '/frameworks', label: 'Frameworks' },
	{ href: '/what-im-exploring', label: 'What I\'m Exploring' },
	{ href: '/my-code', label: 'My Code' },
];

function SmallNavbar() {
	const pathname = usePathname();
	const [showingLinks, setShowingLinks] = useState(false);

	return (
		<nav className={ 'flex flex-col gap-3' }
				 style={ { padding: '10px', boxShadow: '0 2px 4px rgba(128, 128, 128, 0.5)' } }>
			<div className={ 'flex items-center justify-between' }>
				<div style={ { marginLeft: '40px' } }></div>
				<div className={ 'flex flex-col gap-1.5 items-center' }>
					<h1>Panth Patel</h1>
					<div className={ 'flex gap-2 items-center grey' }>
						<Email/>
						<p style={ { transform: 'translate(0px, 2px)' } }>32ppatel@gmail.com</p>
					</div>
					<div className={ 'flex gap-2 items-center grey' }>
						<Phone/>
						<p style={ { transform: 'translate(0px, 2px)' } }>+44 7305821678</p>
					</div>
				</div>
				<Sunny style={ { marginRight: '10px' } }/>
			</div>
			<div className={ 'flex justify-center' } onClick={ () => setShowingLinks(!showingLinks) }>
				<h2>{ showingLinks ? 'Less' : 'More' }</h2>
			</div>
			<ul className={ `flex flex-col gap-7` } style={ { display: showingLinks ? 'contents' : 'none' } }>
				{ navLinks.map((link) => (
					<div key={ link.href } className={ 'flex justify-center' }>
						<li data-selected={ link.href === pathname }>
							<Link href={ link.href }>{ link.label }</Link>
						</li>
					</div>
				)) }
			</ul>
		</nav>
	);
}

function LargeNavbar() {
	const pathname = usePathname();

	return (
		<nav className={ 'flex flex-col gap-3' }
				 style={ { padding: '10px', boxShadow: '0 2px 4px rgba(128, 128, 128, 0.5)' } }>
			<div className={ 'flex items-center gap-4' }>
				<Image className={ 'rounded-full border-2' }
							 loading={ 'eager' }
							 style={ { borderColor: 'var(--foreground)' } }
							 src={ '/profile-pic.png' } alt="profile-pic" width={ 125 }
							 height={ 125 }/>
				<div className={ 'flex flex-col gap-0.5' }>
					<h1>Panth Patel</h1>
					<div className={ 'flex gap-2 items-center grey' }>
						<Email/>
						<p style={ { transform: 'translate(0px, 2px)' } }>32ppatel@gmail.com</p>
					</div>
					<div className={ 'flex gap-2 items-center grey' }>
						<Phone/>
						<p style={ { transform: 'translate(0px, 2px)' } }>+44 7305821678</p>
					</div>
				</div>
				<Sunny style={ { position: 'absolute', right: '20px' } }/>
			</div>
			<ul className={ 'flex gap-5' }>
				{ navLinks.map((link) => (
					<li key={ link.href } data-selected={ link.href === pathname }>
						<Link href={ link.href }>{ link.label }</Link>
					</li>
				)) }
			</ul>
		</nav>
	);
}

export function Navbar() {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const windowResizeListener = () => {
			setWidth(window.innerWidth);
		};
		window.addEventListener('resize', windowResizeListener);
	}, []);

	return (
		width < 620 ? <SmallNavbar/> : <LargeNavbar/>
	);
}