import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { Typography, Card, CardContent, Button, Grid, Box, Dialog, DialogContent } from '@material-ui/core';
import { App, LayoutDashboard, Seo, FormInput, FormSelect, Subsection, CardInfo } from 'components';
import { useInput, useSelect, useMdUp } from 'hooks';
import { isEmpty } from 'helpers';
import { pathConnections, requiredInputMessage, requiredSelectMessage } from 'const';

interface IFormData {
  type: null | string;
  name: null | string;
  account: null | string;
  database: null | string;
  user: null | string;
  password: null | string;
};

const CreateConnection = () => {
  const isMdUp = useMdUp();

  // Form data.
  const [formData, setFormData] = useState<IFormData>({
    type: null,
    name: null,
    account: null,
    database: null,
    user: null,
    password: null,
  });

  // Form error. Helper to check all inputs simultaneously on form submit.
  const [formError, setFormError] = useState(false);

  // Type logic.
  const {
    value: valueType,
    error: errorType,
    setError: setErrorType,
    onChange: onChangeType,
  } = useSelect();

  // Name logic.
  const {
    value: valueName,
    error: errorName,
    setError: setErrorName,
    onChange: onChangeName,
  } = useInput({
    noWhiteSpace: true,
  });

  // Account logic.
  const {
    value: valueAccount,
    error: errorAccount,
    setError: setErrorAccount,
    onChange: onChangeAccount,
  } = useSelect();

  // Database logic.
  const {
    value: valueDatabase,
    error: errorDatabase,
    setError: setErrorDatabase,
    onChange: onChangeDatabase,
  } = useSelect();

  // User logic.
  const {
    value: valueUser,
    error: errorUser,
    setError: setErrorUser,
    onChange: onChangeUser,
  } = useInput({
    noWhiteSpace: true,
  });

  // Password logic.
  const {
    value: valuePassword,
    error: errorPassword,
    setError: setErrorPassword,
    onChange: onChangePassword,
  } = useInput({
    noWhiteSpace: true,
  });

  // Form submit.
  const onSubmit = (e: any) => {
    e.preventDefault(); // Prevent sending.
    setFormError(false); // Reset form error.

    // Checks.
    // Type.
    if (isEmpty(valueType)) {
      setErrorType(requiredSelectMessage);
      setFormError(true);
    };
    // Name.
    if (isEmpty(valueName)) {
      setErrorName(requiredInputMessage);
      setFormError(true);
    };
    // Account.
    if (isEmpty(valueAccount)) {
      setErrorAccount(requiredSelectMessage);
      setFormError(true);
    };
    // Database.
    if (isEmpty(valueDatabase)) {
      setErrorDatabase(requiredSelectMessage);
      setFormError(true);
    };
    // User.
    if (isEmpty(valueUser)) {
      setErrorUser(requiredInputMessage);
      setFormError(true);
    };
    // Password.
    if (isEmpty(valuePassword)) {
      setErrorPassword(requiredInputMessage);
      setFormError(true);
    };

    // Stop if errors.
    if (formError) {
      return false;
    };

    // Update form data.
    setFormData({
      type: valueType,
      name: valueName,
      account: valueAccount,
      database: valueDatabase,
      user: valueUser,
      password: valuePassword,
    });

    // Send form data to backend.
    // ...
  };

  // Confirm cancel dialog.
  const [open, setOpen] = useState(false);
  const toggleConfirmDialog = () => {
    setOpen(!open);
  };

  // Cancel create connection.
  const cancelCreateConnection = () => {
    toggleConfirmDialog();
    typeof window !== 'undefined' && navigate(pathConnections); // Redirect to connections main page.
  };

  return (
    <App>
      <LayoutDashboard>
        <Seo title='Create Connection' />

        <Grid container spacing={4}>
          <Grid item xs={12} lg={7}>
            {/* Form. */}
            <form onSubmit={e => onSubmit(e)}>
              <Subsection>
                <Typography variant='h3' gutterBottom>
                  Create Connection
                </Typography>

                <Card>
                  <CardContent>

                    {/* Type select UI. */}
                    <FormSelect
                      name='type'
                      label='Type'
                      value={valueType}
                      error={errorType}
                      onChange={e => onChangeType(e)}
                      options={[
                        {
                          value: 'snowflake',
                          text: 'Snowflake'
                        },
                      ]}
                    />

                    {/* Name input UI. */}
                    <FormInput
                      type='text'
                      name='name'
                      label='Name'
                      value={valueName}
                      error={errorName}
                      onChange={e => onChangeName(e)}
                    />

                    {/* Account select UI. */}
                    <FormSelect
                      name='account'
                      label='Account'
                      value={valueAccount}
                      error={errorAccount}
                      onChange={e => onChangeAccount(e)}
                      options={[
                        {
                          value: 'account-1',
                          text: 'Account 1'
                        },
                        {
                          value: 'account-2',
                          text: 'Account 2'
                        },
                      ]}
                    />

                    {/* Database select UI. */}
                    <FormSelect
                      name='database'
                      label='Database'
                      value={valueDatabase}
                      error={errorDatabase}
                      onChange={e => onChangeDatabase(e)}
                      options={[
                        {
                          value: 'serving',
                          text: 'serving'
                        },
                      ]}
                    />

                    {/* User input UI. */}
                    <FormInput
                      type='text'
                      name='user'
                      label='User'
                      value={valueUser}
                      error={errorUser}
                      onChange={e => onChangeUser(e)}
                      autoComplete='new-password' // Disable autofill.
                    />

                    {/* Password input UI. */}
                    <FormInput
                      type='password'
                      name='user'
                      label='Password'
                      value={valuePassword}
                      error={errorPassword}
                      onChange={e => onChangePassword(e)}
                      autoComplete='new-password' // Disable autofill.
                    />

                  </CardContent>
                </Card>
              </Subsection>

              <Subsection>
                <Grid container spacing={isMdUp ? 4 : 0}>
                  <Grid item xs={12} md={6} className='order-md-2'>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      size='large'
                      fullWidth
                    >
                      Create
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6} className='order-md-1'>
                    <Button
                      variant='outlined'
                      color='secondary'
                      size='large'
                      fullWidth
                      onClick={toggleConfirmDialog}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Subsection>
            </form>
          </Grid>
          <Grid item xs={12} lg={5}>
            {/* Documentation. */}
            <Subsection>
              <Typography variant='h4' gutterBottom>
                Relevant Documentation
              </Typography>
              <CardInfo link='#0' btnText='Learn'>
                <Typography variant='h5'>
                  Concepts:
                  {' '}
                  <Box component='span' fontWeight='fontWeightRegular'>
                    Snowflake Concepts
                  </Box>
                </Typography>
              </CardInfo>

              <CardInfo link='#0' btnText='Learn'>
                <Typography variant='h5'>
                  How-to Guides:
                  {' '}
                  <Box component='span' fontWeight='fontWeightRegular'>
                    How to set up Snowflake
                  </Box>
                </Typography>
              </CardInfo>

              <CardInfo link='#0' btnText='Learn'>
                <Typography variant='h5'>
                  Tutorials:
                  {' '}
                  <Box component='span' fontWeight='fontWeightRegular'>
                    Connecting Snowflake for the first time
                  </Box>
                </Typography>
              </CardInfo>

              <CardInfo link='#0' btnText='Learn'>
                <Typography variant='h5'>
                  Reference:
                  {' '}
                  <Box component='span' fontWeight='fontWeightRegular'>
                    Connections API
                  </Box>
                </Typography>
              </CardInfo>

            </Subsection>
          </Grid>
        </Grid>


        <Dialog
          open={open}
          onClose={toggleConfirmDialog}
        >
          <DialogContent>
            <Typography variant='h4' gutterBottom align='center'>
              Cancel and delete changes?
            </Typography>
            <Grid container justify='space-between' spacing={4}>
              <Grid item xs>
                <Button
                  variant='outlined'
                  color='primary'
                  size='large'
                  onClick={toggleConfirmDialog}
                >
                  No, Leave
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant='contained'
                  color='secondary'
                  size='large'
                  onClick={cancelCreateConnection}
                >
                  Yes, Delete
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

      </LayoutDashboard>
    </App>
  );
};

export default CreateConnection;
