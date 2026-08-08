import React from 'react';
import './page-container.css';

export default function PageContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className={ 'page-container' }>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img className={ 'background-image' } src={'/code-background.png'} alt={''} />
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img className={ 'picture-image' } src={'/profile-pic.png'} alt={''} />
			{children}
		</div>
	)
}