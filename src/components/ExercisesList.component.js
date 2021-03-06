import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { ReactComponent as EditSVG } from '../icons/svg/edit-solid.svg';
import { ReactComponent as TrashSVG } from '../icons/svg/trash-alt-regular.svg';

const Exercise = props => {
  const styles = {
    icons: {
      height: '1rem',
      // cursor: 'pointer',
      margin: '0 .5rem'
    },
    trashCan: {
      color: 'red',
      ':hover': {
        color: 'blue'
      }
    },
    edit: {
      color: 'black'
    }
  };

  return (
    <tr className="text-center">
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td> {props.exercise.duration} min</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${props.exercise._id}`} className="text-warning">
          <EditSVG style={styles.icons} />
        </Link>{' '}
        <Link to="" className="text-danger">
          <TrashSVG
            style={styles.icons}
            onClick={() => {
              props.deleteExercise(props.exercise._id);
            }}
          />
        </Link>
      </td>
    </tr>
  );
};

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/exercises/')
      .then(res => {
        this.setState({ exercises: res.data });
      })
      .catch(err => console.error(err));
  }

  deleteExercise(id) {
    Axios.delete('http://localhost:5000/exercises/' + id).then(res =>
      console.log(res.data)
    );
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  exercisesList() {
    return this.state.exercises.map(currExercise => (
      <Exercise
        exercise={currExercise}
        deleteExercise={this.deleteExercise}
        key={currExercise._id}
      />
    ));
  }

  render() {
    return (
      <>
        <h3 className="text-center mb-4 card-title">Logged Exercises</h3>
        <table className="table border">
          <thead className="thead-light">
            <tr className="text-center">
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exercisesList()}</tbody>
        </table>
      </>
    );
  }
}
