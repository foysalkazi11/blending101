/* eslint-disable @next/next/no-img-element */
import React, {useRef} from 'react';
import styles from './dataCard.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface dataCardInterface {
	title: string;
	ingredients: string;
	category: string;
	ratings: number;
	noOfRatings: number;
	carbs: number;
	score: number;
	calorie: number;
	noOfComments: number;
	brandLogo: string;
}

export default function DatacardComponent({
	title,
	ingredients,
	category,
	ratings,
	noOfRatings,
	carbs,
	score,
	calorie,
	noOfComments,
	brandLogo
}: dataCardInterface) {

    title = title || 'Triple Berry Smoothie';
    ingredients = ingredients || 'Cocoa powder, almond milk, avocado, mango, banana, honey, vanilla extract';
    category = category || 'Smoothie';
    noOfRatings = noOfRatings || 71;
    carbs = carbs || 23;
    calorie = calorie || 270;
    score = score ||  701;
    noOfComments = noOfComments || 21
    brandLogo = brandLogo || '/cards/juice.png';

    const menu = useRef<any>()


	const handleEclipse = () => {
        // HANDLE ECLIPSE CLICK HERE
    };

	const handleCompare = () => {
        // HANDLE COMPARE CLICK HERE
    };

	const handleComment = () => {
        // HANDLE COMMENTS CLICK HERE
    };

    const handleClick = () => {
        const elem = menu.current;
        elem.classList.toggle('show__hidden')
    }

	const DataBody = () => (
		<div className={styles.databody}>
			<div className={styles.databody__top}>
				<div className={styles.databody__top__label}>{category}</div>
				<div className={styles.databody__top__info}>
					<img src="/icons/star.svg" alt="star" />
					<span>{ratings}</span>&nbsp;
					<span>({noOfRatings})</span>
				</div>
			</div>
			<div className={styles.databody__bottom}>
				<p>
					{ingredients}
				</p>
			</div>
		</div>
	);

    const FloatingMenu = () => (
        <div className={styles.floating__menu} ref={menu}>
            <ul>
                <li><img src="/icons/square.png" alt="square" /></li>
                <li><img src="/icons/share.png" alt="square" /></li>
                <li><img src="/icons/edit.png" alt="square" /></li>
                <li><img src="/icons/calender.png" alt="square" /></li>
                <li><img src="/icons/cart.png" alt="square" /></li>
            </ul>
        </div>
    )

	return (
		<div className={styles.datacard}>
			<div className={styles.datacard__inner}>
				<div className={styles.datacard__body}>
					<div className={styles.datacard__body__top}>
						<div className={styles.datacard__body__top__heading}>
							<h2 className={styles.title}>{title}</h2>
						</div>
						<div className={styles.datacard__body__top__menu}>
                            <MoreVertIcon onClick={handleClick} />
                            <FloatingMenu />
                        </div>
					</div>
					<div className={styles.datacard__body__middle}>
						<div className={styles.datacard__body__middle__left}>
							<div
								className={styles.image}
								style={{ backgroundImage: `url(${brandLogo})` }}
							></div>
						</div>
						<div className={styles.datacard__body__middle__right}>
							<DataBody />
						</div>
					</div>
					<div className={styles.datacard__body__belt}>
						<div className={styles.datacard__body__belt__child}>
							Net Carbs <span>{carbs}</span>
						</div>
						<div className={styles.datacard__body__belt__child}>
							Rx Score <span>{score}</span>
						</div>
						<div className={styles.datacard__body__belt__child}>
							Calorie <span>{calorie}</span>
						</div>
					</div>
					<div className={styles.datacard__body__bottom}>
						<div className={styles.datacard__body__bottom__left}>
							<img src="/icons/delish.png" alt="brand" />
						</div>
						<div className={styles.datacard__body__bottom__right}>
							<ul>
								<li>
									{' '}
									<img
										src="/icons/eclipse.svg"
										alt="eclipse"
										onClick={handleEclipse}
									/>{' '}
								</li>
								<li>
									{' '}
									<img
										src="/icons/compare.svg"
										alt="compare"
										onClick={handleCompare}
									/>{' '}
								</li>
								<li>
									{' '}
									<img
										src="/icons/message.svg"
										alt="message"
										onClick={handleComment}
									/>{' '}
									<span>{noOfComments}</span>{' '}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
