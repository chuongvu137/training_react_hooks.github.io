import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFilterForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
    onSubmit: null
}

function PostFilterForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingSearchRef = useRef(null);

    function handleOnChange(e) {
        const value = e.target.value;
        setSearchTerm(value);

        if (!onSubmit) return;

        // SET -- 100 -- CLEAR, SET -- 300 -- SUBMIT
        // SET -- 300 -- SUBMIT
        if (typingSearchRef.current) {
            clearTimeout(typingSearchRef.current);
        }
        typingSearchRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value
            }
            onSubmit(formValues);
        }, 300);
    }

    return (
        <form>
            <input type='text' value={searchTerm} onChange={handleOnChange} />
        </form>
    );
}

export default PostFilterForm;