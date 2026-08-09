import Section from '@/app/components/section/section';
import PageContainer from '@/app/components/page-container/page-container';

export default function Home() {
	return (
		<PageContainer>
			<h1>Panth Patel</h1>
			<p className={ 'info-text' }>I am a programmer with experience in many areas and frameworks, and someone
				who is always learning new skills, frameworks and areas of programming.</p>
			<Section title={ 'Skills' } href={ '/skills' }
							 body={ 'I am skilled in many areas of programming. I can develop both frontend and backend with many frameworks, making me a great fit into most projects.' }
							 image={ '/skills.png' }/>
			<Section title={ 'Frameworks' } href={ '/frameworks' }
							 body={ 'I am adept with many programming frameworks for both frontend and backend development, so I can fit in well in many roles for various projects.' }
							 image={ '/frameworks.webp' }/>
			<Section title={ 'What I\'m exploring' } href={ '/what-im-exploring' }
							 body={ 'I am always looking to expand my skill set, to make me more suitable for more projects and more roles. See what I\'m learning now!' }
							 image={ '/what-i-am-exploring.png' }/>
			<Section title={ 'My Code' } href={ '/my-code' }
							 body={ 'I believe in collaboration when it comes to programming, and so I use Github to host my code and collaborate with others. Feel free to check out what I\'ve been working on.' }
							 image={ '/my-code.png' }/>
		</PageContainer>
	);
}
