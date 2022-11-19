export const employeesTableStyles = theme => ({
  root: {
    width: "100%"
  },
  head: {
    background: theme.palette.primary.main,
    color: "#0c68aa",
    fontWeight: "bold"
  },
  row: {
    "&:hover": {
      cursor: "pointer"
    }
  }
});