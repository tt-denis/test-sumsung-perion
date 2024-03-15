import React from 'react';
import styles from './SliderPlaceholder.module.scss';
import placeholder1 from '../../../../../assets/img/vacuum_placeholder_1.png';
import placeholder2 from '../../../../../assets/img/vacuum_placeholder_2.png';
import placeholder3 from '../../../../../assets/img/vacuum_placeholder_3.png';
import placeholder4 from '../../../../../assets/img/vacuum_placeholder_4.png';
import placeholder5 from '../../../../../assets/img/vacuum_placeholder_5.png';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SlidePlaceholderInterface {
	sliderRef: React.MutableRefObject<any>,
	imgFirstSlideRef: React.MutableRefObject<any>
}

const slidePlaceholderConfig = {
	modules: [Autoplay, EffectFade, Navigation],
	effect: 'fade',
	loop: true,
	speed: 300,
	style: { marginRight: 0 },
};

const SlidePlaceholder: React.FC<SlidePlaceholderInterface> = ({ sliderRef, imgFirstSlideRef }) => {


	return (
		<Swiper ref={sliderRef} className={styles.swiperPosition} {...slidePlaceholderConfig}>
			<SwiperSlide className={`${styles.swiperSliderWrapper} swiper-no-swiping`}>
				<div className={styles.imgWrapperFirst}>
					<img ref={imgFirstSlideRef} className={styles.imgFirstSlide} src={placeholder1} alt={'placeholder 1'} />
				</div>
			</SwiperSlide>
			<SwiperSlide className={styles.swiperSliderWrapper}>
				<div className={styles.imgWrapper}><img src={placeholder2} alt={'placeholder 2'} /></div>
			</SwiperSlide>
			<SwiperSlide className={styles.swiperSliderWrapper}>
				<div className={styles.imgWrapper}><img src={placeholder3} alt={'placeholder 2'} /></div>
			</SwiperSlide>
			<SwiperSlide className={styles.swiperSliderWrapper}>
				<div className={styles.imgWrapper}><img src={placeholder4} alt={'placeholder 4'} /></div>
			</SwiperSlide>
			<SwiperSlide className={styles.swiperSliderWrapper}>
				<div className={styles.imgWrapper}><img src={placeholder5} alt={'placeholder 5'} /></div>
			</SwiperSlide>
		</Swiper>
	);
};

export default SlidePlaceholder;
