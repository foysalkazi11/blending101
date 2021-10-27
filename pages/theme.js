import InputComponent from '../theme/input/input.component';
import styles from '../styles/Theme.module.css';
import ButtonComponent from '../theme/button/button.component';
import TogglerComponent from '../theme/toggler/toggler.component';
import { useState } from 'react';
import CardComponent from '../theme/cards/card.component';
import SpecialcardComponent from '../theme/cards/specialCard.component';
import TitleComponent from '../theme/titles/title.component';
import MenubarComponent from '../theme/menuBar/menuBar.component';

export default function Home() {
	const [toggler, setToggler] = useState('The How');
	return (
		<div className={styles.theme__child}>

			{/* BUTTON THEME COMPONENTS HERE */}
			<div className={styles.theme__box}>
				<h3>BUTTONS</h3>
				<ButtonComponent value="Primary" type="primary" /> &nbsp; &nbsp;
				<ButtonComponent value="Transparent" type="transparent" /> &nbsp; &nbsp;
				<ButtonComponent value="Default" type="primaryy" />
			</div>

			<br />

			{/* TOGGLER THEME COMPONTNT STARTS HERE */}
			<div className={styles.theme__box}>
				<h3>TOGGLER</h3>
				<div className={styles.toggler}>
					<TogglerComponent
						childs={['The Way', 'The How', 'The Why', 'The Will']}
						childColor="#fff"
						tags={['Part 1', 'Part 2', 'Part 3', 'Part 4']}
						tagColor="#fff"
						icons={[
							'/icons/tab1.svg',
							'/icons/tab2.svg',
							'/icons/tab3.svg',
							'/icons/tab4.svg',
						]}
						value={toggler}
						setValue={setToggler}
					/>
				</div>
			</div>

      <br />

      <div className={styles.theme__box}>
      <h3>MENUBAR</h3>
        <MenubarComponent />
      </div>

			<br />

			{/* CARDS THEME COMPONENTS HERE */}
			<div className={styles.theme__box}>
				<h3>CARDS</h3>
				<div className={styles.cards}>
					<div className={styles.card}>
						<CardComponent title="Primary Card" />
					</div>
					<div className={styles.card}>
						<CardComponent type="second" title="Secondary Card" />
					</div>
					<div className={styles.card}>
						<SpecialcardComponent title="This is an example of card named Special Card." />
					</div>
					<div className={styles.card}>
						<SpecialcardComponent
							type="secondary"
							img="/cards/milk.png"
							title="Another Special Card With Secondary Attribute."
						/>
					</div>
				</div>
			</div>

			<br />

			{/* TITLE COMPONENT STARTS HERE */}
			<div className={styles.theme__box}>
				<h3>TYPOGRAPHY</h3>
				<div style={{ display: 'flex' }}>
					<TitleComponent
						type="icon"
						icon="/icons/clock.svg"
						text="Heading With Icon"
					/> &nbsp; &nbsp; &nbsp; &nbsp;
					<TitleComponent text="Heading No Icon" />
				</div>
			</div>

      <br />

      {/* INPUT THEME COMPONENTS HERE */}
			<div className={styles.theme__box}>
				<h3>INPUTS</h3>
				<InputComponent
					width={'300px'}
					style={{ padding: '15px 20px', borderRadius: '7px' }}
				/>
			</div>

		</div>
	);
}
