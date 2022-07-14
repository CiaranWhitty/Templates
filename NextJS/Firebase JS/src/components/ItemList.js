import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import { Grid } from "@mantine/core";

import Item from "./Item";
import FilterControls from "./FilterControls";

export default function ItemList({ items, page }) {
  const [nameFilter, setNameFilter] = useState("");

  let displayedItems = items.filter((i) => {
    if (i.name === undefined) {
      return i;
    } else {
      return i.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    }
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
  };

  return (
    <>
      {page === "Things" ? (
        <FilterControls
          onUserInput={handleChange}
          items={items}
          numItems={displayedItems.length}
          page={page}
        />
      ) : (
        <></>
      )}
      {displayedItems.length === 0 ? (
        <>{page === "Things" && <h2>No Things</h2>}</>
      ) : (
        <>
          {page === "Things" && (
            <Grid justify="center" align="center">
              {displayedItems.map((item, k) => {
                return <Item page="Things" item={item} key={k} />;
              })}
            </Grid>
          )}
        </>
      )}
    </>
  );
}
