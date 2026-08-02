import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import React from 'react';
import { Navbar } from './navbar';

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Panth Patel\'s Portfolio',
	description: 'Software development portfolio',
};

export default function RootLayout({
																		 children,
																	 }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={ `${ montserrat.variable } h-full antialiased` }
		>
		<head>
			<meta charSet={ 'utf-8' }/>
			<meta name={ 'viewport' } content={ 'width=device-width, initial-scale=1.0' }/>
			<meta name={ 'lang' } content={ 'en-GB' }/>
			<link rel="icon" href="/profile-pic.png"/>
			<title>Panth Patel&apos;s Portfolio</title>
		</head>
		<body className="min-h-full flex flex-col">
		<Navbar />
		{ children }
		</body>
		</html>
	);
}