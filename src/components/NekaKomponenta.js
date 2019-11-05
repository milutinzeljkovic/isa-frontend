import React, { Component } from 'react';
import { connect } from 'react-redux';
import { akcija2 } from '../actions/entitet';

class NekaKomponenta extends Component {

    onClickHandler = () => {
        this.props.akcija2();
    }

    render() {
        return (
            <div>
                
                <button onClick={this.onClickHandler}>Klikni</button>
                <p>{ this.props.podaci === null ? 'nema nista' : this.props.podaci.rezultatAkcije}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        podaci: state.nekiEntitet
    }
}

export default connect(mapStateToProps, { akcija2 })(NekaKomponenta);