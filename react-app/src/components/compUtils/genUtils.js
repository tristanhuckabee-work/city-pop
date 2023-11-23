export const formatDate = (date) => {
  if (date) {
    const months = ['Janua', 'Febru', 'March', 'April', 'May', 'June', 'July', 'Augus', 'Septe', 'Octob', 'Novem', 'Dec']
    const splitUp = date?.split(' ');
    const day = splitUp[1];
    let month = splitUp[2];
    months?.forEach((m, i) => {
      if (m.startsWith(month)) month = i;
    });
    const year = splitUp[3];
    return `${month} / ${day} / ${year}`;
  }
}