export default function NotepadWindow({name, title, text_1, text_2, link_1, link_2}) {
    return (
        <div className="modal__card modal__card--note">
            <div className="modal__header">
            <h2 className="modal__title">
                <img src="../assets/notepad_2.ico" />
                {name}.txt - Notepad
            </h2>
            <div className="header__button">
                <button className="button button--close"></button>
            </div>
            </div>

            <div className="modal__content modal__content--note">
            <div className="note__header">
                <p><span>F</span>ile</p>
                <p><span>E</span>dit</p>
                <p>F<span>o</span>rmat</p>
                <p><span>V</span>iew</p>
                <p><span>H</span>elp</p>
            </div>
            <h1>{title}</h1>
            <p className="note__text">
                {text_1}
            </p>
            <p className="note__text">
                {text_2}
            </p>

            { link_1 &&
                <>
                    <a className="note__link" target="_blank" href={link_1.link}>-&gt; {link_1.name}</a><br/>
                </>
            }
            { link_2 && 
                <>
                    <a className="note__link" target="_blank" href={link_2.link}>-&gt; {link_2.name}</a>
                </>
            }

            </div>
        </div>
    )
}