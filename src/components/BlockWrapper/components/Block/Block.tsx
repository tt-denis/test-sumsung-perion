import React, { useEffect, useRef, useState } from 'react';
import styles from './Block.module.scss';
import placeholder1 from '../../../../assets/img/vacuum_placeholder_1.png';
import placeholder2 from '../../../../assets/img/vacuum_placeholder_2.png';
import placeholder3 from '../../../../assets/img/vacuum_placeholder_3.png';
import placeholder4 from '../../../../assets/img/vacuum_placeholder_4.png';
import placeholder5 from '../../../../assets/img/vacuum_placeholder_5.png';
import kitchnLogo from '../../../../assets/img/kitchn_logo.png';
import samsungLogo from '../../../../assets/img/samsung_logo.png';
import leftArrow from '../../../../assets/img/left_arrow.png';
import rightArrow from '../../../../assets/img/right_arrow.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';

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
	const [shopNowAnimationStop, setShopNowAnimationStop] = useState(false);

	const runShopNowAnimationStop = () => {
		if (!shopNowAnimationStop) {
			shopNowRef.current.style.animation = 'none';
			setShopNowAnimationStop(true);
		}
	};

	const handleNext = () => {
		sliderRef.current.swiper.slideNext(300);
		sliderTextRef.current.swiper.slideNext(300);
		setCurrentSlide(sliderRef.current?.swiper.realIndex);
		if (autoPlay) {
			sliderTextRef.current.swiper.autoplay.stop();
			sliderRef.current.swiper.autoplay.stop();
		}
	};

	const handlePrevious = () => {
		sliderRef.current.swiper.slidePrev(300);
		sliderTextRef.current.swiper.slidePrev(300);
		setCurrentSlide(sliderRef.current?.swiper.realIndex);
		if (autoPlay) {
			sliderTextRef.current.swiper.autoplay.stop();
			sliderRef.current.swiper.autoplay.stop();
		}
	};
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

	const runTextAnimation = (elem: Element | null, delay = 0): Promise<Animation> => {
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

		console.log(sliderTextRef.current);
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

	const openBlank = () => {
		window.open('', '_blank');
	};

	return (
		<div className={styles.block}>
			<div className={styles.contentWrapper}>
				<div className={styles.leftSideContent}>
					<div className={styles.leftSide}>
						<img ref={logoRef} className={styles.sumsungLogo} src={samsungLogo} alt={''} />
						<div className={styles.leftSideTextWrapper}>
							<div ref={text1Ref} className={styles.leftSideText}>See why the Bespoke Jet<span>™</span>
							</div>
							<div ref={text2Ref} className={styles.leftSideText}>is “so good” it made this</div>
							<div ref={text3Ref} className={styles.leftSideText}>
								<img className={styles.kitchnLogo} src={kitchnLogo} alt={'Kitchn Logo'} /> journalist
								cry
							</div>
							<div className={styles.sliderTextWrapper} id={'sliderText'}>
								<Swiper ref={sliderTextRef} className={`${styles.swiperTextPosition} swiper-no-swiping`}
										style={{ margin: 0 }} modules={[Autoplay, EffectFade, Navigation]}
										loop={true} speed={300}
										onAutoplay={(swiper: any) => setCurrentSlide(swiper.realIndex)}
										autoHeight={true}
								>
									<SwiperSlide>
										<div className={styles.sliderTextSlide}>
											“The first time I used the Samsung Bespoke Jet™,<br />
											I cried. I’m not being sensational; I really did.<br />
											Of course, this vacuum worked great.<br />
											But that’s not all.”
											<span onClick={openBlank}> Read more…</span>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className={styles.sliderTextSlide}>
											“If you’re an over-cleaner, like myself, you’ll nerd<br />
											out on all of the functions. If you avoid this chore<br />
											at all costs, you’ll appreciate how simple<br />
											Samsung makes it.”
											<span onClick={openBlank}> Read more…</span>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className={styles.sliderTextSlide}>
											“Both the floor and pet hair attachments are<br />
											cleverly designed to eliminate the dreaded hair<br />
											wrap. (In other words, you’ll never have to tackle<br />
											hair tangles with a pair of scissors again.)” <br />
											<span onClick={openBlank}> Read more…</span>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className={styles.sliderTextSlide}>
											“When I learned the Samsung Bespoke Vac cleaned itself<br />
											with amazing technology, that’s when I cried. No more<br />
											scraping spider legs and hair out of the crevices with my<br />
											hands. Its suction power is so strong, the canister is left<br />
											perfectly clean after every use. It’s like a vacuum for your<br />
											vacuum.”
											<span onClick={openBlank}> Read more…</span>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className={styles.sliderTextSlide}>
											“Because it’s so nice-looking, it can live right in the<br />
											kitchen. No more hauling a vacuum up and down<br />
											the basement stairs on the daily”
											<span onClick={openBlank}> Read more…</span>
										</div>
									</SwiperSlide>
								</Swiper>
								<div ref={navigationContainerRef} className={styles.navigationContainer}>
									<img className={styles.arrow} onClick={handlePrevious} src={leftArrow} alt={''} />
									<div>{currentSlide + 1}/{sliderRef.current?.swiper.slides.length}</div>
									<img className={styles.arrow} onClick={handleNext} src={rightArrow} alt={''} />

								</div>
								<div onMouseEnter={runShopNowAnimationStop} onClick={openBlank} ref={shopNowRef} className={styles.shopNow}>SHOP NOW
								</div>
							</div>
						</div>
					</div>
					<div className={styles.bspokeJet}>Bespoke Jet<span>™</span></div>
				</div>
			</div>
			<Swiper ref={sliderRef} className={styles.swiperPosition}
					style={{ marginRight: 0 }}
					modules={[Autoplay, EffectFade, Navigation]}
					effect={'fade'}
					loop={true}
					speed={300}
			>
				<SwiperSlide className={`${styles.swiperSliderWrapper} swiper-no-swiping`}>
					<div className={styles.imgWrapperFirst}>
						<img ref={imgFirstSlideRef} className={styles.imgFirstSlide} src={placeholder1} alt={''} />
					</div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSliderWrapper}>
					<div className={styles.imgWrapper}><img src={placeholder2} alt={''} /></div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSliderWrapper}>
					<div className={styles.imgWrapper}><img src={placeholder3} alt={''} /></div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSliderWrapper}>
					<div className={styles.imgWrapper}><img src={placeholder4} alt={''} /></div>
				</SwiperSlide>
				<SwiperSlide className={styles.swiperSliderWrapper}>
					<div className={styles.imgWrapper}><img src={placeholder5} alt={''} /></div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Block;
