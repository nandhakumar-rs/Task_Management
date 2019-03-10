import { TestBed } from '@angular/core/testing';

import { AddNewTaskService } from './add-new-task.service';

describe('AddNewTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddNewTaskService = TestBed.get(AddNewTaskService);
    expect(service).toBeTruthy();
  });
});
