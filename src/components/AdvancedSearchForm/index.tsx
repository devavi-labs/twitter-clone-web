import DateFnsUtils from "@date-io/date-fns";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField, RadioGroup, Switch } from "formik-material-ui";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RoundedButton } from "..";
import { AdvancedSearchValues } from "../../types";
import { buildQueryForAdvancedSearch } from "../../utils/advancedSearchQueryBuilder";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";

const initialValues: AdvancedSearchValues = {
  words: {
    like: "",
    exactPhrase: "",
    or: "",
    notTheseWords: "",
    hashtags: "",
  },
  accounts: {
    fromTheseUsernames: "",
    toTheseUsernames: "",
    mentions: "",
  },
  dates: {
    since: new Date("2014-08-18T21:11:54"),
    until: new Date(),
  },
  engagement: {
    minReplies: "",
    minLikes: "",
    minRequacks: "",
  },
  filters: {
    replies: {
      on: false,
      value: "include",
    },
    links: {
      on: false,
      value: "include",
    },
  },
};

const AdvancedSearchForm: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  const handleSubmit = (
    values: AdvancedSearchValues,
    { resetForm }: FormikHelpers<AdvancedSearchValues>
  ) => {
    const query = buildQueryForAdvancedSearch(values, initialValues);
    resetForm();
    history.replace(`/search?q=${query}&src=typed_query`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({
        values: {
          filters: { replies, links },
        },
      }) => (
        <Form className={classes.form}>
          <Typography
            variant="h2"
            component="h2"
            id="modal-title"
            className={classes.heading}
          >
            Words
          </Typography>
          <Divider />
          <Field
            name="words.like"
            component={TextField}
            label="All of these words"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: what’s happening · contains both “what’s” and “happening”"
          />
          <Field
            name="words.exactPhrase"
            component={TextField}
            label="This exact phrase"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: happy hour · contains the exact phrase “happy hour”"
          />
          <Field
            name="words.or"
            component={TextField}
            label="Any of these words"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: cats, dogs · contains either “cats” or “dogs” (or both)"
          />
          <Field
            name="words.notTheseWords"
            component={TextField}
            label="None of these words"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: cats, dogs · does not contain “cats” and does not contain “dogs”"
          />
          <Field
            name="words.hashtags"
            component={TextField}
            label="These hashtags"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: #ThrowbackThursday · contains the hashtag #ThrowbackThursday"
          />
          <Divider />
          <Typography
            variant="h2"
            component="h2"
            id="modal-title"
            className={classes.heading}
          >
            Accounts
          </Typography>
          <Divider />
          <Field
            name="accounts.fromTheseUsernames"
            component={TextField}
            label="From these accounts"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: @Quacker · sent from @Quacker"
          />
          <Field
            name="accounts.toTheseUsernames"
            component={TextField}
            label="To these accounts"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: @Quacker · sent in reply to @Quacker"
          />
          <Field
            name="accounts.mentions"
            component={TextField}
            label="Mentioning these accounts"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: @SFBART @Caltrain · mentions @SFBART or mentions @Caltrain"
          />
          <Divider />
          <Typography
            variant="h2"
            component="h2"
            id="modal-title"
            className={classes.heading}
          >
            Filters
          </Typography>
          <Divider />

          <Accordion expanded={replies.on} elevation={0}>
            <AccordionSummary
              expandIcon={
                <Field
                  component={Switch}
                  type="checkbox"
                  name="filters.replies.on"
                  color="primary"
                />
              }
              IconButtonProps={{
                style: {
                  transform: "rotate(0deg)",
                },
              }}
            >
              <Typography
                variant="h2"
                component="h2"
                id="modal-title"
                className={classes.subHeading}
              >
                Replies
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Field
                component={RadioGroup}
                name="filters.replies.value"
                className={classes.fullWidth}
              >
                <FormControlLabel
                  value="include"
                  control={
                    <Radio
                      checkedIcon={<FaCheckCircle className={classes.icon} />}
                      size="small"
                    />
                  }
                  label="Only show replies"
                  labelPlacement="start"
                  classes={{
                    label: classes.rowSB,
                    root: classes.fullWidth,
                  }}
                />
                <FormControlLabel
                  value="exclude"
                  control={
                    <Radio
                      checkedIcon={<FaCheckCircle className={classes.icon} />}
                      size="small"
                    />
                  }
                  label="Don't show replies"
                  labelPlacement="start"
                  classes={{
                    label: classes.rowSB,
                    root: classes.fullWidth,
                  }}
                />
              </Field>
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Accordion expanded={links.on} elevation={0}>
            <AccordionSummary
              expandIcon={
                <Field
                  component={Switch}
                  type="checkbox"
                  name="filters.links.on"
                  color="primary"
                />
              }
              IconButtonProps={{
                style: {
                  transform: "rotate(0deg)",
                },
              }}
            >
              <Typography
                variant="h2"
                component="h2"
                id="modal-title"
                className={classes.subHeading}
              >
                Links
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Field
                component={RadioGroup}
                name="filters.links.value"
                className={classes.fullWidth}
              >
                <FormControlLabel
                  value="include"
                  control={
                    <Radio
                      checkedIcon={<FaCheckCircle className={classes.icon} />}
                      size="small"
                    />
                  }
                  label="Only show Quacks with links"
                  labelPlacement="start"
                  classes={{
                    label: classes.rowSB,
                    root: classes.fullWidth,
                  }}
                />
                <FormControlLabel
                  value="exclude"
                  control={
                    <Radio
                      checkedIcon={<FaCheckCircle className={classes.icon} />}
                      size="small"
                    />
                  }
                  label="Don't show Quacks with links"
                  labelPlacement="start"
                  classes={{
                    label: classes.rowSB,
                    root: classes.fullWidth,
                  }}
                />
              </Field>
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Typography
            variant="h2"
            component="h2"
            id="modal-title"
            className={classes.heading}
          >
            Engagement
          </Typography>
          <Divider />
          <Field
            name="engagement.minReplies"
            component={TextField}
            label="Minimum replies"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: 280 · Quacks with at least 280 replies"
          />
          <Field
            name="engagement.minLikes"
            component={TextField}
            label="Minimum likes"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: 280 · Quacks with at least 280 Likes"
          />
          <Field
            name="engagement.minRequacks"
            component={TextField}
            label="Minimum requacks"
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="Example: 280 · Tweets with at least 280 Retweets"
          />
          <Divider />
          <Typography
            variant="h2"
            component="h2"
            id="modal-title"
            className={classes.heading}
          >
            Dates
          </Typography>
          <Divider />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <Field
                component={KeyboardDatePicker}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="From"
                name="dates.since"
              />
              <Field
                component={KeyboardDatePicker}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="To"
                name="dates.until"
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <RoundedButton
            type="submit"
            color="primary"
            variant="contained"
            disableElevation
            className={classes.searchButton}
          >
            Search
          </RoundedButton>
        </Form>
      )}
    </Formik>
  );
};

export { AdvancedSearchForm };
