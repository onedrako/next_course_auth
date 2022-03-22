import { Layout } from "@components/Layout";
import { GetServerSideProps } from "next";
import  { useSession, getSession } from "next-auth/react";


export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  //validar sesión
  const session = await getSession(context);

  if(session === null){
    return {
      redirect : {
        destination : '/api/auth/signin',
        permanent : false
      },
    }
  }

  return {
    props: {session}
  }
}

function PremiumPage(){
  const {data: session, status} = useSession();

  if (status === 'loading') {
    return null
  }

  if(session == null){
    return <Layout>
      <h1>Premium</h1>
      <p>You must be logged in to view this page.</p>
    </Layout>
  }

  return (
    <Layout>
      <h1>Premium Page</h1>
      <p>Contenido Secreto</p>
    </Layout>
  )
}

export default PremiumPage;