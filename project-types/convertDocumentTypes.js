const mapper = require('./objectKeyTypeMapper');

const convert = root => {
    const result = {
        ...root
    };
    const propertyMapper = mapper(root.property_types);
    result.property_values = propertyMapper(root.property_values);
    const taskMapper = mapper(root.task_types);
    result.tasks = root.tasks.map(taskMapper);
    const resourceMapper = mapper(root.resource_types);
    result.resources = root.resources.map(resourceMapper);
    const assignmentMapper = mapper(root.assignment_types);
    result.assignments = root.assignments.map(assignmentMapper);
    return result;
};

module.exports = convert;