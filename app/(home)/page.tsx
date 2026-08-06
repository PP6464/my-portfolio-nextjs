import Section from '@/app/components/section/section';

export default function Home() {
	return (
		<div className={ 'overflow-x-hidden flex flex-col items-center' }>
			<h1>Home</h1>
			<p>Placeholder text for the Home page.</p>
			<Section title={ 'Skills' } href={ '/skills' }
							 body={ 'I am skilled in many areas of programming. I can develop both frontend and backend with many frameworks, making me a great fit into most projects.' }
							 image={ '/code-background.png' }/>
			<Section title={ 'Skills' } href={ '/skills' }
							 body={ 'I am skilled in many areas of programming. I can develop both frontend and backend with many frameworks, making me a great fit into most projects.' }
							 image={ '/code-background.png' }/>
			<Section title={ 'Skills' } href={ '/skills' }
							 body={ 'I am skilled in many areas of programming. I can develop both frontend and backend with many frameworks, making me a great fit into most projects.' }
							 image={ '/code-background.png' }/>
			<Section title={ 'Skills' } href={ '/skills' }
							 body={ 'I am skilled in many areas of programming. I can develop both frontend and backend with many frameworks, making me a great fit into most projects.' }
							 image={ '/code-background.png' }/>
		</div>
	);
}
