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

type SearchBarProps = {
  input?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ input = "" }) => {
  const classes = useStyles();
  const { xs } = useMediaQuery();

  const [
    ,
    { pushSearch, initialize: initializeRecentSearches },
  ] = useRecentSearches();
  const [, { handleOpen, handleQueryUpdate, handleClose }] = useInstantSearch();

  const [value, setValue] = React.useState<Value>({
    actualValue: input,
    trimmedValue: input,
  });

  const { open, anchorEl, onClose, setAnchorEl, setOpen } = usePopper();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue({
      actualValue: e.target.value,
      trimmedValue: e.target.value.trim(),
    });
    handleQueryUpdate(e.target.value.trim());

    if (!open) {
      setOpen(true);
      handleOpen();
    }
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
      setOpen(false);
      handleClose();
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
          placeholder="Search Quacker"
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
