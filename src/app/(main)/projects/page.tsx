import { Container } from '@/components/Container';

import { Header } from './Header';

import { ProjectList } from './ProjectList';
import { projects } from './data';
export default async function Projects() {
  return (
    <Container className='overflow-x-hidden'>
      <Header
        title='我过去的项目经历'
        description='我一直在做各种各样的项目，下面是我筛选出来我觉得还不错的项目合集，也是我在技术领域中努力实践和应用的最好见证。'
      />
      <ProjectList data={projects} />
    </Container>
  );
}
