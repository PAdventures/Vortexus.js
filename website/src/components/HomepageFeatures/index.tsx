import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
	title: string;
	description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		title: 'About',
		description: (
			<>
				Vortexus.js is a complex discord app framework made to be simple out of the box for developers
			</>
		),
	},
	{
		title: 'Key Features',
		description: (
			<>
				<ol>
                    <li>Customisable Config File</li>
                    <li>Commands use a Module system</li>
                </ol>
			</>
		),
	},
	{
		title: 'Powered by Discord.js',
		description: (
			<>
				Vortexus.js is built on-top of <a href='https://discord.js.org' target='_blank'>Discord.js</a>
			</>
		),
	},
];

function Feature({ title, description }: FeatureItem) {
	return (
		<div className={clsx('col col--4')}>
			<div className="padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
