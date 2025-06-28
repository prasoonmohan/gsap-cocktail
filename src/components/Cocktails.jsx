import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { cocktailLists, mockTailLists } from '../../constants/index.js'
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Cocktails = () => {
	const sectionRef = useRef(null);
	const leftLeafRef = useRef(null);
	const rightLeafRef = useRef(null);

	useGSAP(() => {
		const parallaxTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: 'top 30%',
				end: 'bottom 80%',
				scrub: true
			}
		});

		parallaxTimeline
			.from(leftLeafRef.current, { x: -100, y: 100, ease: 'none' })
			.from(rightLeafRef.current, { x: 100, y: 100, ease: 'none' });
	}, []);

	return (
		<section id="cocktails" className="noisy" ref={sectionRef}>
			<img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" ref={leftLeafRef} />
			<img src="/images/cocktail-right-leaf.png" alt="r-leaf" id="c-right-leaf" ref={rightLeafRef} />

			<div className="list">
				<div className="popular">
					<h2>Most popular cocktails:</h2>

					<ul>
						{cocktailLists.map(({ name, country, detail, price }) => (
							<li key={name}>
								<div className="md:me-28">
									<h3>{name}</h3>
									<p>{country} | {detail}</p>
								</div>
								<span>- {price}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="loved">
					<h2>Most loved mocktails:</h2>

					<ul>
						{mockTailLists.map(({ name, country, detail, price }) => (
							<li key={name}>
								<div className="me-28">
									<h3>{name}</h3>
									<p>{country} | {detail}</p>
								</div>
								<span>- {price}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}

export default Cocktails
