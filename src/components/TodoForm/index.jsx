import PropTypes from 'prop-types';
import React, { useState } from 'react';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null
}

function TodoForm(props) {
    const { onSubmit } = props;
    const [value, setValue] = useState('');

    function handleValueChange(e) {
        setValue(e.target.value);
    }

    function handleSubmit(e) {
        // prevent reloading browser
        e.preventDefault();
        if (!onSubmit) return;

        const formValues = {
            title: value
        }
        onSubmit(formValues);
        // reset value
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={handleValueChange}
            />
        </form>
    );
}

export default TodoForm;