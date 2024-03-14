import React from 'react';
import styles from './BlockWrapper.module.scss';
import Block from './components/Block/Block';

const BlockWrapper = () => {
	return (
		<div className={styles.blockWrapper}>
			<Block />
		</div>
	);
};

export default BlockWrapper;
