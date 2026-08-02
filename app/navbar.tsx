'use client'

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Email from '@mui/icons-material/Email';
import { Phone } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';
import './navbar.css';

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/about-me', label: 'About Me' },
	{ href: '/skills', label: 'Skills' },
	{ href: '/frameworks', label: 'Frameworks' },
	{ href: '/what-im-exploring', label: 'What I\'m Exploring' },
	{ href: '/my-code', label: 'My Code' },
];

export function Navbar() {
	const pathname = usePathname();

	return (
		<nav className={ 'flex flex-col gap-3' }
				 style={ { padding: '10px', boxShadow: '0 2px 4px rgba(128, 128, 128, 0.5)' } }>
			<div className="flex items-center gap-4">
				<Image className={ 'rounded-full border-2' }
							 style={ { borderColor: 'var(--foreground)' } }
							 src={ '/profile-pic.png' } alt="profile-pic" width={ 125 }
							 height={ 125 }/>
				<div className={ 'flex flex-col gap-0.5' }>
					<h1>Panth Patel</h1>
					<div className={ 'flex gap-2 items-center grey' }>
						<Email/>
						<p>32ppatel@gmail.com</p>
					</div>
					<div className={ 'flex gap-2 items-center grey' }>
						<Phone/>
						<p>+44 7305821678</p>
					</div>
				</div>
			</div>
			<ul className="flex gap-3">
				{ navLinks.map((link) => (
					<li key={ link.href } data-selected={link.href === pathname}>
						<Link href={ link.href }>{ link.label }</Link>
					</li>
				)) }
			</ul>
		</nav>
	);
}