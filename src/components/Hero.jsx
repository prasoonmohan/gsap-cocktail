import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText);

const Hero = () => {

	const isMobile = useMediaQuery({ maxWidth: 756 });
	const videoRef = useRef()

	useGSAP(() => {
		const heroSplit = new SplitText('.title', { type: 'chars , words' });
		const paragraph = new SplitText('.subtitle', { type: 'lines' });

		heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

		gsap.from(heroSplit.chars, {
			yPercent: 100,
			duration: 1.8,
			ease: 'expo.out',
			stagger: 0.05
		})

		gsap.from(paragraph.lines, {
			opacity: 0,
			yPercent: 100,
			duration: 1.8,
			ease: 'expo.out',
			stagger: 0.05,
			delay: 1
		})

		gsap.timeline({
			scrollTrigger: {
				trigger: '#hero',
				start: 'top top',
				end: 'bottom top',
				scrub: true
			}
		})
			.to('.right-leaf', { y: 200, ease: 'none' }, 0)
			.to('.left-leaf', { y: -200, ease: 'none' }, 0)

		const start = isMobile ? 'top 50%' : 'center 60%'
		const end = isMobile ? '120% top' : 'bottom top'

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: 'video',
				start: start,
				end: end,
				scrub: true,
				pin: true
			}
		})

		videoRef.current.onloadedmetadata = () => [
			tl.to(videoRef.current, {
				currentTime: videoRef.current.duration
			})
		]

	}, [])

	return (
		<>
			<section id="hero" className="noisy">
				<h1 className="title">MOJITO</h1>

				<img
					src="/images/hero-left-leaf.png"
					alt="left-leaf"
					className="left-leaf"
				/>
				<img
					src="/images/hero-right-leaf.png"
					alt="right-leaf"
					className="right-leaf"
				/>

				<div className="body">
					{/* <img src="/images/arrow.png" alt="arrow" className="arrow" /> */}

					<div className="content">
						<div className="space-y-5 hidden md:block">
							<p>Cool. Crisp. Classic.</p>
							<p className="subtitle">
								Sip the Spirit <br /> of Summer
							</p>
						</div>

						<div className="view-cocktails">
							<p className="subtitle">
								Every cocktail on our menu is a blend of premium ingredients,
								creative flair, and timeless recipes — designed to delight your
								senses.ś
							</p>
							<a href="#cocktails">View cocktails</a>
						</div>
					</div>
				</div>
			</section>

			<div className="video absolute inset-0">
				<video
					ref={videoRef}
					muted
					playsInline
					preload="auto"
					src="/videos/output.mp4"
				/>
			</div>
		</>
	);
};

export default Hero;