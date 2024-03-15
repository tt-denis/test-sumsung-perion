import React, { useEffect, useRef, useState } from 'react';
import styles from './Block.module.scss';
import kitchnLogo from '../../../../assets/img/kitchn_logo.png';
import samsungLogo from '../../../../assets/img/samsung_logo.png';
import SliderText from './SliderText/SliderText';
import SlidePlaceholder from './SliderPlaceholder/SlidePlaceholder';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const Block = () => {
	const sliderRef = useRef<any>(null);
	const sliderTextRef = useRef<any>(null);
	const logoRef = useRef<any>(null);
	const text1Ref = useRef<any>(null);
	const text2Ref = useRef<any>(null);
	const text3Ref = useRef<any>(null);
	const imgFirstSlideRef = useRef<any>(null);
	const navigationContainerRef = useRef<any>(null);
	const shopNowRef = useRef<any>(null);
	const [animationEnd, setAnimationEnd] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [autoPlay, setAutoPlay] = useState(false);

	useEffect(() => {
		setCurrentSlide(sliderRef.current?.swiper.realIndex);
	}, [currentSlide]);

	useEffect(() => {
		if (!animationEnd) {
			runAnimation();
		}
	}, []);

	async function runAnimation() {
		await runLogoAnimation();
		if (text1Ref.current && text2Ref.current && text3Ref.current)
			await Promise.all([
				runTextAnimation(text1Ref.current),
				runTextAnimation(text2Ref.current, 250),
				runTextAnimation(text3Ref.current, 500),
			]);
		await runSliderAnimation();
		await runShowSlideInfo();

		if (sliderTextRef.current && sliderRef.current) {
			sliderTextRef.current.swiper.autoplay.start();
			sliderRef.current.swiper.autoplay.start();
			setAutoPlay(true);
		}
	}

	const runLogoAnimation = (): Promise<Animation> => {
		const keyframes: Keyframe[] = [
			{ transform: 'translate(-150%, 200%)' },
			{ transform: 'translate(-50%, 200%)' },
			{ transform: 'translate(0%, 200%)' },
			{ transform: 'translate(0%, 0%)' },
		];
		const options: KeyframeEffectOptions = {
			delay: 500,
			duration: 2500,
			fill: 'both',
		};

		const keyframeEffect: KeyframeEffect = new KeyframeEffect(logoRef.current, keyframes, options);
		const animation: Animation = new Animation(keyframeEffect);

		animation.play();

		return animation.finished;
	};

	const runTextAnimation = (elem: Element, delay = 0): Promise<Animation> => {
		const keyframes: Keyframe[] = [
			{ transform: 'translateX(-100%)', opacity: 0, offset: 0 },
			{ transform: 'translateX(0%)', opacity: 1, offset: 1 },
		];
		const options: KeyframeEffectOptions = {
			delay: delay,
			duration: 1000,
			fill: 'both',
		};

		const keyframeEffect: KeyframeEffect = new KeyframeEffect(elem, keyframes, options);
		const animation: Animation = new Animation(keyframeEffect);

		animation.play();

		return animation.finished;
	};

	const runSliderAnimation = (): Promise<Animation[]> => {
		const keyframes1: Keyframe[] = [
			{ width: '100%' },
			{ width: '45%' },
		];
		const keyframes2: Keyframe[] = [
			{ scale: '1' },
			{ scale: '1.5' },
		];
		const options1: KeyframeEffectOptions = {
			delay: 500,
			duration: 700,
			fill: 'both',
		};
		const options2: KeyframeEffectOptions = {
			delay: 500,
			duration: 700,
			fill: 'both',
		};

		const keyframeEffect1: KeyframeEffect = new KeyframeEffect(sliderRef.current, keyframes1, options1);
		const keyframeEffect2: KeyframeEffect = new KeyframeEffect(imgFirstSlideRef.current, keyframes2, options2);
		const animation1: Animation = new Animation(keyframeEffect1);
		const animation2: Animation = new Animation(keyframeEffect2);

		animation1.play();
		animation2.play();

		setCurrentSlide(sliderRef.current?.swiper.realIndex);
		setAnimationEnd(true);

		return Promise.all([animation1.finished, animation2.finished]);
	};

	const runShowSlideInfo = (): Promise<Animation[]> => {
		const sliderText = document.getElementById('sliderText');

		if (sliderText) {
			sliderText.style.visibility = 'visible';
		}

		const keyframes: Keyframe[] = [
			{ opacity: 0 },
			{ opacity: 1 },
		];

		const options1: KeyframeEffectOptions = {
			delay: 750,
			duration: 700,
			fill: 'both',
		};
		const options2: KeyframeEffectOptions = {
			delay: 500,
			duration: 700,
			fill: 'both',
		};

		const keyframeEffect1: KeyframeEffect = new KeyframeEffect(sliderTextRef.current, keyframes, options1);
		const keyframeEffect2: KeyframeEffect = new KeyframeEffect(navigationContainerRef.current, keyframes, options1);
		const keyframeEffect3: KeyframeEffect = new KeyframeEffect(shopNowRef.current, keyframes, options2);

		const animation1: Animation = new Animation(keyframeEffect1);
		const animation2: Animation = new Animation(keyframeEffect2);
		const animation3: Animation = new Animation(keyframeEffect3);

		animation1.play();
		animation2.play();
		animation3.play();

		return Promise.all([animation1.finished, animation2.finished, animation3.finished]);
	};

	return (
		<div className={styles.block}>
			<div className={styles.contentWrapper}>
				<div className={styles.leftSideContent}>
					<div className={styles.leftSide}>
						<img ref={logoRef} className={styles.sumsungLogo} src={samsungLogo} alt={'Sumsung'} />
						<div className={styles.leftSideTextWrapper}>
							<div ref={text1Ref} className={styles.leftSideText}>See why the Bespoke Jet<span>™</span>
							</div>
							<div ref={text2Ref} className={styles.leftSideText}>is “so good” it made this</div>
							<div ref={text3Ref} className={styles.leftSideText}>
								<img className={styles.kitchnLogo} src={kitchnLogo} alt={'Kitchn'} /> journalist cry
							</div>
							<SliderText
								shopNowRef={shopNowRef}
								sliderRef={sliderRef}
								sliderTextRef={sliderTextRef}
								setCurrentSlide={setCurrentSlide}
								autoPlay={autoPlay}
								navigationContainerRef={navigationContainerRef}
								currentSlide={currentSlide}
							/>
						</div>
					</div>
					<div className={styles.bspokeJet}>Bespoke Jet<span>™</span></div>
				</div>
			</div>
			<SlidePlaceholder
				sliderRef={sliderRef}
				imgFirstSlideRef={imgFirstSlideRef}
			/>
		</div>
	);
};

export default Block;
