import { useGSAP } from '@gsap/react'
import { navLinks } from '../../constants/index.js'
import gsap from 'gsap'
import { useRef } from 'react'

const Navbar = () => {

	const navRef = useRef(null)

	useGSAP(() => {

		const navTween = gsap.timeline({
			scrollTrigger: {
				trigger: navRef.current,
				start: "bottom top",
				scrub: true,
				backdropFilter: "blur(0px)",
			}
		});

		navTween.fromTo(navRef.current, { backgroundColor: "transparent", },
			{
				backgroundColor: '#00000050',
				duration: 1,
				backdropFilter: 'blur(10px)',
				ease: "power1.inOut",
			}
		);

	}, [])

	return (
		<nav ref={navRef}>
			<div>
				<a href="#home" className="flex items-center gap-2">
					<img src="/images/logo.png" alt="logo" />
					<p>Velvet Pour</p>
				</a>

				<ul>
					{navLinks.map((link) => (
						<li key={link.id}>
							<a href={`#${link.id}`}>{link.title}</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}
export default Navbar
