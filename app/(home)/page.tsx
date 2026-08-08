import Section from '@/app/components/section/section';
import PageContainer from '@/app/components/page-container/page-container';

export default function Home() {
	return (
		<PageContainer>
			<h1>Panth Patel</h1>
			<p className={'pb-2'}>I am a programmer with experience in many areas and frameworks, and someone
				who is always learning new skills, frameworks and areas of programming.</p>
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
		</PageContainer>
	);
}
