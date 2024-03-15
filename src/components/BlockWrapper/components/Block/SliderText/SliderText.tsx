import React, { useState } from 'react';
import styles from './SliderText.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import leftArrow from '../../../../../assets/img/left_arrow.png';
import rightArrow from '../../../../../assets/img/right_arrow.png';
import { openBlank } from '../../../../../helpers/openBlank';

interface SlidePlaceholderInterface {
	shopNowRef: React.MutableRefObject<any>,
	sliderRef: React.MutableRefObject<any>,
	sliderTextRef: React.MutableRefObject<any>,
	navigationContainerRef: React.MutableRefObject<any>,
	setCurrentSlide: React.Dispatch<React.SetStateAction<number>>,
	currentSlide: number,
	autoPlay: boolean
}

const sliderTextConfig = {
	modules: [Autoplay, EffectFade, Navigation],
	loop: true,
	speed: 300,
	autoHeight: true,
	style: { margin: 0 },
};

const SliderText: React.FC<SlidePlaceholderInterface> = (
	{
		shopNowRef,
		sliderRef,
		sliderTextRef,
		navigationContainerRef,
		setCurrentSlide,
		currentSlide,
		autoPlay,
	}) => {

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


	return (
		<div className={styles.sliderTextWrapper} id={'sliderText'}>
			<Swiper ref={sliderTextRef} className={`${styles.swiperTextPosition} swiper-no-swiping`}
					onAutoplay={(swiper: any) => setCurrentSlide(swiper.realIndex)}
					{...sliderTextConfig}
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
				<img className={styles.arrow} onClick={handlePrevious} src={leftArrow} alt={'left Arrow'} />
				<div>{currentSlide + 1}/{sliderRef.current?.swiper.slides.length}</div>
				<img className={styles.arrow} onClick={handleNext} src={rightArrow} alt={'right Arrow'} />

			</div>
			<div onMouseEnter={runShopNowAnimationStop} onClick={openBlank} ref={shopNowRef} className={styles.shopNow}>
				SHOP NOW
			</div>
		</div>
	);
};

export default SliderText;
