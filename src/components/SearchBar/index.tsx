import {
  ClickAwayListener,
  IconButton,
  InputAdornment,
  InputBase,
} from "@material-ui/core";
import React from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { SearchPopper } from "..";
import {
  useInstantSearch,
  useMediaQuery,
  usePopper,
  useRecentSearches,
} from "../../hooks";
import { useStyles } from "./styles";

type Value = {
  actualValue: string;
  trimmedValue: string;
};

const SearchBar: React.FC = () => {
  const classes = useStyles();
  const { xs } = useMediaQuery();

  const [
    ,
    { pushSearch, initialize: initializeRecentSearches },
  ] = useRecentSearches();
  const [, { handleOpen, handleQueryUpdate }] = useInstantSearch();

  const [value, setValue] = React.useState<Value>({
    actualValue: "",
    trimmedValue: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue({
      actualValue: e.target.value,
      trimmedValue: e.target.value.trim(),
    });
    handleQueryUpdate(e.target.value.trim());
  };

  const clear = () => {
    setValue({
      actualValue: "",
      trimmedValue: "",
    });
    handleQueryUpdate("");
  };

  const inputRef = React.useRef<HTMLElement>();

  const history = useHistory();

  const { open, anchorEl, onClose, setAnchorEl, setOpen } = usePopper();

  const handlePopperOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
    initializeRecentSearches();
    handleOpen();
  };

  const handleSearch = () => {
    pushSearch(value.trimmedValue);
    history.push(`/search?q=${value.trimmedValue}&src=typed_query`);
  };

  const handleEnter = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (value.trimmedValue && event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <div className={classes.searchBar}>
        <InputBase
          ref={inputRef}
          onClick={handlePopperOpen}
          classes={{
            root: classes.input,
            focused: classes.focused,
          }}
          startAdornment={
            <InputAdornment position="start">
              <BsSearch className={classes.icon} />
            </InputAdornment>
          }
          endAdornment={
            value.actualValue && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  className={classes.clearButton}
                  onClick={clear}
                >
                  <BsX />
                </IconButton>
              </InputAdornment>
            )
          }
          fullWidth
          value={value.actualValue}
          onChange={handleChange}
          onKeyUp={handleEnter}
        />
        {!xs && (
          <SearchPopper
            open={open}
            onClose={() => {}}
            anchorEl={anchorEl}
            minWidth={`${inputRef.current?.clientWidth}px`}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export { SearchBar };
