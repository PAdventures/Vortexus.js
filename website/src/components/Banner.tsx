import React, { useState, useEffect } from 'react';

export default function Banner() {
	const [theme, setTheme] = useState(localStorage.getItem('theme'));

	useEffect(() => {
		const handleStorageChange = (event) => {
			if (event.key === 'theme') {
				setTheme(event.newValue);
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return <Image theme={theme} />;
}

function Image({ theme }) {
	return theme === 'dark' ? (
		<img
			src="/img/banner-light.svg"
			alt="Vortexus.js Light Banner"
			width="75%"
		/>
	) : (
		<img
			src="/img/banner-dark.svg"
			alt="Vortexus.js Dark Banner"
			width="75%"
		/>
	);
}
