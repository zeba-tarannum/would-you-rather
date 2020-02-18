import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions/shared';
import {Redirect} from 'react-router-dom';

class NewQuestion extends Component {

    state = {
        optionOneText: '',
        optionTwoText: '',
        toDashboard: false,
        hasSubmitted: false
    };

    handleOptionOneTextChange = (e) => {
        const text = e.target.value;

        this.setState({
            optionOneText: text
        });
    };

    handleOptionTwoTextChange = (e) => {
        const text = e.target.value;

        this.setState({
            optionTwoText: text
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {optionOneText, optionTwoText} = this.state;
        const {dispatch} = this.props;

        this.setState({
            hasSubmitted: true
        });

        dispatch(handleAddQuestion(optionOneText, optionTwoText, () => {
            this.setState({
                optionOneText: '',
                optionTwoText: '',
                toDashboard: true
            });
        }));
    };

    render() {
        const {
            optionOneText,
            optionTwoText,
            toDashboard,
            hasSubmitted
        } = this.state;

        if (toDashboard === true) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className='projectContainer'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-sm-8'>
                                <div className='card'>
                                    <div className='card-header bold'>Create New Question</div>
                                    <div className='card-body'>
                                        <div className='container'>
                                            <div className='row justify-content-center p-20-top-bottom'>
                                                <div className='col-sm-12'>
                                                    <p><strong>Would You Rather...?</strong></p>
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className='form-group'>
                                                            <input
                                                                className='form-control'
                                                                placeholder='Enter option one text here...'
                                                                value={optionOneText}
                                                                onChange={this.handleOptionOneTextChange}
                                                            />
                                                        </div>
                                                        <div className='form-group'>
                                                            <input
                                                                className='form-control'
                                                                placeholder='Enter option two text here...'
                                                                value={optionTwoText}
                                                                onChange={this.handleOptionTwoTextChange}
                                                            />
                                                        </div>
                                                        <input type='submit'
                                                               name='submit'
                                                               id='submit'
                                                               value={hasSubmitted ? "Submitting Question..." : "Submit"}
                                                               className='btn btn-outline-primary'
                                                               disabled={
                                                                   optionOneText === '' ||
                                                                   optionTwoText === '' ||
                                                                   hasSubmitted
                                                               } />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(NewQuestion);