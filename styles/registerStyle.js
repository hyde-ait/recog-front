import css from "styled-jsx/css";

export default css.global`
  * {
    box-sizing: border-box;
  }

  /* Add padding to containers */
  .container {
    padding-left: 20%;
    padding-right: 20%;
  }

  /* Full-width input fields */
  input[type="text"],
  input[type="password"],
  input[type="email"] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: var(--main);
    color: var(--third);
    border: 1px solid var(--third);
  }

  input[type="text"]:focus,
  input[type="password"]:focus,
  input[type="email"]:focus {
    background-color: var(--fourth);
    outline: none;
  }

  /* Overwrite default styles of hr */
  hr {
    border: 1px solid var(--main);
    margin-bottom: 25px;
  }

  /* Set a style for the submit/register button */
  .registerbtn {
    background-color: var(--main);
    color: var(--fourth);
    padding: 16px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
    transition: all 0.2s ease-in-out;
  }

  .registerbtn:hover {
    opacity: 1;
    background-color: var(--fourth);
    color: var(--main);
    font-weight: bold;
    transition: all 0.2s ease-in-out;
  }

  /* Add a blue text color to links */
  a {
    color: dodgerblue;
  }

  /* Set a grey background color and center the text of the "sign in" section */
  .signin {
    background-color: var(--main);
    text-align: center;
  }
`;
