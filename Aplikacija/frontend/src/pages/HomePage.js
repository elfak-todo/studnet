function HomePage() {
  const student = JSON.parse(localStorage.getItem('student'));

  return <div> {student.accessToken} </div>;
}

export default HomePage;
