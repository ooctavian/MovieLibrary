import styles from '../styles/Card.module.css';
const Card = ({title,genres,poster_url}) =>{
   return <>
       <div className={styles.card}>
           <img alt={title} src={`https://image.tmdb.org/t/p/original/${poster_url}`}/>
           <div className={styles.info}>
               <div className={styles.genres}>{genres.map((genre,key)=><span key={key} className={styles.genre}> {genre} </span>)}</div>
               <div className={styles.titleContainer}>
                   <span className={styles.cardTitle}>{title}</span>
               </div>
           </div>
       </div>
    </>
}

export default Card;
