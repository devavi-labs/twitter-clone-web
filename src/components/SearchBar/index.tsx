import {
  IconButton,
  InputAdornment,
  InputBase,
  ClickAwayListener,
} from "@material-ui/core";
import React from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { SearchPopper } from "..";
import { usePopper } from "../../hooks/usePopper";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { ISearchResultContext } from "../../context/instantSearch";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useRecentSearches } from "../../hooks/useRecentSearches";

type SearchBarProps = {};

type Value = {
  actualValue: string;
  trimmedValue: string;
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const classes = useStyles();
  const { xs } = useMediaQuery();

  const { pushSearch } = useRecentSearches();
  const { setOpen: setISROpen, setQuery, query } = React.useContext(
    ISearchResultContext
  )!;

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
  };

  const clear = () => {
    setValue({
      actualValue: "",
      trimmedValue: "",
    });
  };

  React.useEffect(() => {
    if (value.trimmedValue !== query) {
      setQuery(value.trimmedValue);
    }
  }, [query, setQuery, value.trimmedValue]);

  const inputRef = React.useRef<HTMLElement>();

  const history = useHistory();

  const { open, anchorEl, onClose, setAnchorEl, setOpen } = usePopper();

  const handlePopperOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
    setISROpen(true);
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
