import React, {Component} from 'react';
import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: false,
        error: false
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    onPersonLoaded = (person) => {
        this.setState({
            person,
            loading: false
        });
    };

    updatePerson() {
        const {personId} = this.props;
        if (!personId) {
            return;
        }
        this.setState({
            loading:true
        });
        this.swapiService
            .getPerson(personId)
            .then(this.onPersonLoaded)
            .catch(this.onError);
    }

    render() {
        if (!this.state.person) {
            return <span>Select a person from a list</span>
        }

        const {person, loading, error} = this.state;
        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner /> : null;
        const personContent = hasData ? <PersonView person={person}/> : null;

        return (
            <div className="person-details card">
                {spinner}
                {personContent}
                {errorMessage}      {/* Пока ошибка получения данных НЕ ВЫВОДИТЬСЯ! */}
            </div>
        );
    }
}

const PersonView = ({person}) => {
    const {id, name, gender, birthYear, eyeColor} = person;

    return (
        <React.Fragment>
            <img className="person-image"
                 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                 alt="character"
            />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor ?? 'undefined'}</span>
                    </li>
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    )
};
