'use client';

import { usePathname } from 'next/navigation';
import Email from '@mui/icons-material/Email';
import { DarkMode, Phone, Sunny } from '@mui/icons-material';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import './navbar.css';
import { IconButton } from '@mui/material';
import { useTheme } from 'next-themes';
import { useMounted } from '@/app/hooks/use-mounted';

function removeSlashes(s: string): string {
	return s.replaceAll('/', '');
}

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/about-me/', label: 'About Me' },
	{ href: '/skills/', label: 'Skills' },
	{ href: '/frameworks/', label: 'Frameworks' },
	{ href: '/what-im-exploring/', label: 'What I\'m Exploring' },
	{ href: '/my-code/', label: 'My Code' },
];

function ToggleIcon({ style }: { style?: React.CSSProperties }) {
	const { resolvedTheme, setTheme } = useTheme();
	const mounted = useMounted();

	if (!mounted) return null;

	return (
		<IconButton
			style={ { position: 'absolute', color: resolvedTheme === 'dark' ? 'white' : 'orange', ...style } }
			onClick={ () => {
				setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
			} }>
			{ resolvedTheme === 'dark' ? <DarkMode/> :
				<Sunny/> }
		</IconButton>
	);
}

function SmallNavbar() {
	const pathname = usePathname();
	const [showingLinks, setShowingLinks] = useState(false);
	const [selected, setSelected] = useState<string>(pathname);
	const refs = [
		useRef<HTMLAnchorElement>(null),
		useRef<HTMLAnchorElement>(null),
		useRef<HTMLAnchorElement>(null),
		useRef<HTMLAnchorElement>(null),
		useRef<HTMLAnchorElement>(null),
		useRef<HTMLAnchorElement>(null),
	];

	return (
		<nav className={ 'flex flex-col min-w-full nav:hidden' }
				 style={ { paddingTop: '10px', boxShadow: '0 2px 4px var(--shadow)' } }>
			<div className={ 'flex items-center justify-center' }>
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
				<ToggleIcon style={ { right: '10px' } }/>
			</div>
			<div id={ 'small-navbar-toggle' } className={ 'flex justify-center' }
					 onClick={ () => setShowingLinks(!showingLinks) }>
				<h2>{ showingLinks ? 'Less' : 'More' }</h2>
			</div>
			<ul className={ `flex flex-col gap-7` } style={ { display: showingLinks ? 'block' : 'none' } }>
				{ navLinks.map((link, i) => (
					<li onClick={ () => refs[i].current?.click() } className={ 'flex justify-center' } key={ link.href }
							data-selected={ removeSlashes(link.href) === removeSlashes(selected) }>
						<div>
							<Link ref={ refs[i] } onClick={ () => { setSelected(link.href); setShowingLinks(false); } }
										href={ link.href }>{ link.label }</Link>
						</div>
					</li>
				)) }
			</ul>
		</nav>
	);
}

function LargeNavbar() {
	const pathname = usePathname();
	const [selected, setSelected] = useState<string>(pathname);
	const refs = [
		useRef<HTMLAnchorElement>(null),
		useRef<HTMLAnchorElement>(null),
		useRef<HTMLAnchorElement>(null),
		useRef<HTMLAnchorElement>(null),
		useRef<HTMLAnchorElement>(null),
		useRef<HTMLAnchorElement>(null),
	];

	return (
		<nav className={ 'nav:flex flex-col gap-3 min-w-full hidden' }
				 style={ { padding: '10px', boxShadow: '0 2px 4px var(--shadow)' } }>
			<div className={ 'flex items-center gap-3' }>
				{/* eslint-disable-next-line @next/next/no-img-element */ }
				<img className={ 'rounded-full border-2' }
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
				<ToggleIcon style={ { right: '20px' } }/>
			</div>
			<ul className={ 'flex' }>
				{ navLinks.map((link, i) => (
					<li onClick={ () => refs[i].current?.click() } key={ link.href }
							data-selected={ removeSlashes(link.href) === removeSlashes(selected) }>
						<div>
							<Link ref={ refs[i] } onClick={ () => setSelected(link.href) } href={ link.href }>{ link.label }</Link>
						</div>
					</li>
				)) }
			</ul>
		</nav>
	);
}

export function Navbar() {
	// These navbars are governed by Tailwind CSS to not appear together or both not appear
	return (
		<>
			<SmallNavbar/>
			<LargeNavbar/>
		</>
	);
}