import { Container } from '@/components/Container';

import { projects } from './data';
import { Header } from './Header';
import { ProjectList } from './ProjectList';
export default async function Projects() {
  return (
    <Container className='overflow-x-hidden'>
      <Header
        title='我的项目经历'
        description='这些项目是我在前端开发领域的实践积累，覆盖前端多框架、移动端、后端服务等多个领域。'
      />
      <ProjectList data={projects} />
    </Container>
  );
}
